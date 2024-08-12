import React, { useState, useEffect, useRef } from "react";
import "./style.scss";

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
    <div>
      <div
        className="menu"
        onMouseEnter={() => setMenuVisible(true)}
        ref={menuButtonRef}
      >
        menu
      </div>
      {menuVisible && (
        <ul className="TestParent" ref={menuRef}>
          <div className="first">
            {list.map((i) => (
              <li
                key={i.number_to_categorie}
                onMouseEnter={() => setActiveCategory(i.number_to_categorie)}
                onClick={() => click(i?.name)}
              >
                {i.name}
              </li>
            ))}
          </div>
          <div className="second">
            {list.map((i) => (
              <li
                key={i.number_to_categorie}
                className={
                  i.number_to_categorie === activeCategory ? "active" : ""
                }
              >
                {i.number_to_categorie === activeCategory && (
                  <div>
                    {i.categories.map((j) => (
                      <div
                        key={j.codeid}
                        onMouseEnter={() => setActiveSubCategory(j.codeid)}
                        onClick={() => click(j.category_name)}
                      >
                        {j.category_name}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </div>
          <div className="third">
            {list
              .find((i) => i.number_to_categorie === activeCategory)
              ?.categories.map((j) =>
                j.codeid === activeSubCategory ? (
                  <li key={j.codeid} className="active">
                    <div>
                      {j.establishments.map((k) => (
                        <div
                          key={k.codeid}
                          onClick={() => click(k.establishment_name)}
                        >
                          {k.establishment_name}
                        </div>
                      ))}
                    </div>
                  </li>
                ) : null
              )}
          </div>
        </ul>
      )}
    </div>
  );
};

export default Test;
