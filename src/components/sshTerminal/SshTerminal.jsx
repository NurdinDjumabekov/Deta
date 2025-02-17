import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import { FitAddon } from "xterm-addon-fit";
import { io } from "socket.io-client";
import "./style.css";

const SshTerminal = () => {
  const terminalRef = useRef(null);
  const socket = useRef(null);
  const terminal = useRef(null);
  const commandBuffer = useRef("");

  useEffect(() => {
    if (terminalRef.current) {
      terminal.current = new Terminal({
        cursorBlink: true,
      });

      const fitAddon = new FitAddon();
      terminal.current.loadAddon(fitAddon);
      terminal.current.open(terminalRef.current);
      fitAddon.fit();

      const resizeObserver = new ResizeObserver(() => {
        fitAddon.fit();
      });
      resizeObserver.observe(terminalRef.current);

      socket.current = io("http://localhost:3002");

      socket.current.on("ssh_data", (data) => {
        terminal.current.write(data);
      });

      socket.current.on("ssh_error", (error) => {
        terminal.current.write(`\r\nERROR: ${error}\r\n`);
      });

      socket.current.emit("ssh_connect", {
        host: "11.12.2.33",
        port: 22,
        username: "root",
        password: "Afina954120",
      });

      terminal.current.onData((data) => {
        console.log(data, "data");

        if (data === "\r") {
          socket.current.emit("ssh_command", commandBuffer.current);
          commandBuffer.current = "";
          terminal.current.write("\r\n");
        } else if (data === "\u007F") {
          if (commandBuffer.current.length > 0) {
            commandBuffer.current = commandBuffer.current.slice(0, -1);
            terminal.current.write("\b \b");
          }
        } else if (data >= " " && data <= "~") {
          commandBuffer.current += data;
          terminal.current.write(data);
        } else {
          socket.current.emit("ssh_command", data);
        }
      });

      return () => {
        resizeObserver.disconnect();
        socket.current.disconnect();
        terminal.current.dispose();
      };
    }
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{ height: "100%", width: "100%", display: "flex" }}
    />
  );
};
