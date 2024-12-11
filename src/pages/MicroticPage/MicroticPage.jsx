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

///////helpers
import { myAlert } from "../../helpers/MyAlert";
import { colorsList, sortMicroticNums } from "../../helpers/LocalData";

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
    const res = await dispatch(crudMicroticsReq(modal)).unwrap();
    if (res == 1) {
      myAlert("Успешно сохранено!");
      setModal({});
      dispatch(getMicroticsReq());
    } else if (res == 2) {
      myAlert("Такое наименование уже существует");
    } else {
      myAlert("Упс, что-то пошло не так", "error");
    }
  };

  const actionObj = { 1: "Добавить", 2: "Изменить" };

  return (
    <>
      <div className="microticPage hoverScroll">
        <div className="microticPage__inner">
          <h3>Маршрутизатор</h3>
          <NumberTypes
            list={sortMicroticNums(listMicrotics?.routers)}
            title={"Маршрутизатор"}
          />
          <h3>Входная группа</h3>
          <div className="list">
            {listMicrotics?.routers?.map((item, index) => (
              <div className="every" key={index}>
                <div className="colors" style={{ background: item.color }}>
                  <p className={item?.color == "rgb(255, 242, 0)" ? "CW" : ""}>
                    {item?.name}
                  </p>
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
          <NumberTypes
            list={sortMicroticNums(listMicrotics?.switchs)}
            title={"Свитч"}
          />
          <h3>Входная группа</h3>
          <div className="list">
            {listMicrotics?.switchs?.map((item, index) => (
              <div className="every" key={index}>
                <div className="colors" style={{ background: item.color }}>
                  <p className={item?.color == "rgb(255, 242, 0)" ? "CW" : ""}>
                    {item?.name}
                  </p>
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
