import React, { useState, useEffect, useRef } from "react";
import "./style.scss";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Test = () => {
  const list = [
    {
      number_to_categorie: 1,
      name: "Цветы",
      categories: [
        {
          codeid: "1",
          category_name: "Розы",
          status: 1,
          number_to_categorie: 1,
          establishments: [
            {
              codeid: "1",
              establishment_name: "Большие букеты",
              status: 0,
              code_category: "1",
              navLink: "/categ", /// пример
            },
            {
              codeid: "2",
              establishment_name: "101 роза",
              status: 0,
              code_category: "1",
              navLink: "/categ", /// пример
            },
          ],
        },
        {
          codeid: "5",
          category_name: "В коробке",
          status: 1,
          number_to_categorie: 1,
          establishments: [
            {
              codeid: "5",
              establishment_name: "1",
              status: 0,
              code_category: "5",
            },
            {
              codeid: "6",
              establishment_name: "2",
              status: 0,
              code_category: "5",
            },
          ],
        },
      ],
    },
    {
      number_to_categorie: 5,
      name: "Букеты",
      categories: [
        {
          codeid: "2",
          category_name: "Микс букеты",
          status: 1,
          number_to_categorie: 5,
          establishments: [
            {
              codeid: "3",
              establishment_name: "Большие",
              status: 0,
              code_category: "2",
            },
            {
              codeid: "4",
              establishment_name: "Small",
              status: 0,
              code_category: "2",
            },
          ],
        },
      ],
    },
    {
      number_to_categorie: 11,
      name: "Доп товары",
      categories: [
        {
          codeid: "3",
          category_name: "Фальга",
          status: 1,
          number_to_categorie: 11,
          establishments: [
            {
              codeid: "5",
              establishment_name: "1",
              status: 0,
              code_category: "5",
            },
            {
              codeid: "6",
              establishment_name: "2",
              status: 0,
              code_category: "5",
            },
          ],
        },
      ],
    },
    {
      number_to_categorie: 12,
      name: "Шары",
      categories: [
        {
          codeid: "4",
          category_name: "Сердечко)",
          status: 1,
          number_to_categorie: 12,
          establishments: [],
        },
      ],
    },
  ];

  const [menuVisible, setMenuVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !menuButtonRef.current.contains(event.target)
    ) {
      setMenuVisible(false);
      setActiveCategory(null);
      setActiveSubCategory(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const click = (text) => {
    alert(text);
  };

  return (
    <TableContainer component={Paper} className="tableEditDns">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="title name" style={{ width: "15%" }}>
              Наименования
            </TableCell>
            <TableCell className="title type" style={{ width: "20%" }}>
              Типы
            </TableCell>
            <TableCell className="title ttl" style={{ width: "10%" }}>
              TTL
            </TableCell>
            <TableCell className="title dta" style={{ width: "15%" }}>
              Data
            </TableCell>
            <TableCell
              className="title action"
              style={{ width: "10%" }}
            ></TableCell>
            <TableCell className="title comment" style={{ width: "30%" }}>
              Комментарий
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[]?.map((row) => (
            <TableRow key={row?.guid}>
              <TableCell
                className="text nameText"
                style={{ margin: "10px", width: "15%" }}
              >
                asdasd
              </TableCell>
              <TableCell className="text name" style={{ width: "20%" }}>
                asdasd
              </TableCell>
              <TableCell className="text name" style={{ width: "10%" }}>
                asda
              </TableCell>
              <TableCell className="text data" style={{ width: "15%" }}>
                asda
              </TableCell>
              <TableCell className="text actions" style={{ width: "10%" }}>
                asdas
              </TableCell>
              <TableCell className="text comment" style={{ maxWidth: "30%" }}>
                asdas
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Test;
