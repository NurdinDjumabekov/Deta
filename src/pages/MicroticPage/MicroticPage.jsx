/////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/////// fns
import {
  crudMicroticsReq,
  getMicroticsReq,
} from "../../store/reducers/microticSlice";

/////// img
import edit from "../../assets/icons/edit.svg";
import AddIcon from "@mui/icons-material/Add";

///////helpers
import { myAlert } from "../../helpers/MyAlert";
import {
  listColor,
  anotherListColor,
  colorsList,
} from "../../helpers/LocalData";
import { getTextColor } from "../../helpers/getBrightness";

///////components
import NumberTypes from "../../components/MicroticPage/NumberTypes/NumberTypes";
import Modals from "../../common/Modals/Modals";
import MyInputs from "../../common/MyInput/MyInputs";

///////style
import "./style.scss";

const MicroticPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [modal, setModal] = useState({});

  const { listMicrotics } = useSelector((state) => state.microticSlice);

  useEffect(() => {
    dispatch(getMicroticsReq());
  }, [pathname]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setModal({ ...modal, [name]: value });
  };

  const crudMicrotic = async (e) => {
    e.preventDefault();
    if (!!!modal?.title) {
      return myAlert("Заполните заголовок, ", "error");
    }

    if (!!!modal?.color) {
      return myAlert("Выберите цвет", "error");
    }
    const res = await dispatch(crudMicroticsReq(modal)).unwrap();
    if (res == 1) {
      myAlert("Успешно сохранено!");
      setModal({});
    } else if (res == 2) {
      myAlert("Такое наименование уже существует");
    }
  };

  const openModalAdd = (action, link) => {
    setModal({ action, title: "", description: "", color: "", link });
  };

  const actionObj = { 1: "Добавить", 2: "Изменить" };

  console.log(modal, "modal");

  return (
    <>
      <div className="microticPage hoverScroll">
        <div className="microticPage__inner">
          <h3>Маршрутизатор</h3>
          <NumberTypes list={listMicrotics?.routers} title={"Маршрутизатор"} />
          <h3>Входная группа</h3>
          <div className="list">
            <button
              className="addMicr"
              onClick={() => openModalAdd(1, "createMikrotik")}
            >
              <AddIcon sx={{ fill: "green", width: 30, height: 30 }} />
            </button>
            {listMicrotics?.routers?.map((item, index) => (
              <div className="every" key={index}>
                <div className="colors" style={{ background: item.color }}>
                  <p>{item?.codeid}</p>
                </div>
                <button
                  onClick={() =>
                    setModal({ action: 2, ...item, link: "createMikrotik" })
                  }
                >
                  <img src={edit} alt="edit" />
                </button>
                <div className="texts">
                  <p>{item?.title}</p>
                  <span>{item?.description}</span>
                </div>
              </div>
            ))}
            <h5>Нам нужно:</h5>
            <ul>
              <li>
                Чтобы мы могли мониторить ( как сейчас нас устраивает, пинг и
                графики)
              </li>
              <li>
                Защита чтобы автозащита от ДДОС была и мы могли заносить в
                черные и белые списки, ограничение скорости, чтобы мы могли
                включать такой режим и видеть куда какой айпишник обращается
                (оказывается нам нужно)
              </li>
              <li>Нам нужно NAT по портам делать со статиков</li>
              <li>ipSec tunnel и OpenVPN делать</li>
              <li>Вход по 8443 порту чтобы было на микротик</li>
              <li>Бекап системы и конфигурации чтобы на резерв переносить</li>
              <li>Нам нужно мониторить состояние ВПН каналов</li>
            </ul>
          </div>
        </div>
        <div className="microticPage__inner">
          <h3>Свитч</h3>
          <NumberTypes list={listMicrotics?.switchs} title={"Свитч"} />
          <h3>Входная группа</h3>
          <div className="list">
            <button
              className="addMicr"
              onClick={() => openModalAdd(1, "createSwitch")}
            >
              <AddIcon sx={{ fill: "green", width: 30, height: 30 }} />
            </button>
            {listMicrotics?.switchs?.map((item, index) => (
              <div className="every" key={index}>
                <div className="colors" style={{ background: item.color }}>
                  <p>{item?.codeid}</p>
                </div>
                <button
                  onClick={() =>
                    setModal({ action: 2, ...item, link: "createSwitch" })
                  }
                >
                  <img src={edit} alt="edit" />
                </button>
                <div className="texts">
                  <p>{item?.title}</p>
                  <span>{item?.description}</span>
                </div>
              </div>
            ))}
            <h5>Нам нужно:</h5>
            <p>
              В эти сетки попасть можно будет через те айпишники которые я скажу
              в начале на маршрутизаторе будут настроены
            </p>
            <p>
              Почему так по портам?- К каждому порту буду подключать свитчи и
              далее масштабировать
            </p>
            <p>
              Например для внутренней сети требуется примерно 100 портов, я
              подключу две циски по 48 портови будук ним подключать компы
            </p>
            <p>
              Например в Ceph унас всего 32 компа, сейчас пока стоит 5 компов
              поэтому один порт так как к нему подключен один свитч на 48 портов
              и больше не предвидеться.
            </p>
          </div>
        </div>
      </div>
      <Modals
        openModal={!!modal?.action}
        setOpenModal={() => setModal({})}
        title={actionObj?.[modal?.action]}
      >
        <form onSubmit={crudMicrotic} className="formMicrotics">
          <MyInputs
            title={"Заголовок"}
            onChange={onChange}
            name={"title"}
            value={modal?.title}
          />

          <MyInputs
            title={"Описание"}
            onChange={onChange}
            name={"description"}
            value={modal?.description}
          />

          <ul className="listColors">
            {colorsList?.map((item) => (
              <li
                style={{ background: item }}
                className={modal?.color == item ? "active" : ""}
                onClick={() => setModal({ ...modal, color: item })}
              ></li>
            ))}
          </ul>

          <div className="actions">
            <button className="addActionBtn" type="submit">
              Сохранить
            </button>
          </div>
        </form>
      </Modals>
    </>
  );
};

export default MicroticPage;
