import { useState } from "react";
import SearchCalendar from "../SearchCalendar";
import lupa from "../../assets/images/lupa.png";
import "./style.css";

const SearchForm = (props) => {
  const { setSearchParams, searchParams } = props;
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [order, setOrder] = useState(searchParams.get("order") || "createdAt");
  const [direction, setDirection] = useState(
    searchParams.get("direction") || "DESC"
  );

  const [initDate, setInitDate] = useState("");
  const [finalDate, setFinalDate] = useState("");

  return (
    <form
      className="searchform"
      onSubmit={(event) => {
        event.preventDefault();

        const queryParams = { order, direction, initDate, finalDate };

        if (search) {
          queryParams.search = search;
        }

        setSearchParams(new URLSearchParams(queryParams));
      }}
    >
      <section>
        <button>
          <img src={lupa} alt="Buscar"></img>
        </button>
        <input
          id="search"
          type="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </section>
      <section>
        <label htmlFor="order">Ordenado por:</label>
        <select
          id="order"
          value={order}
          onChange={(event) => {
            setOrder(event.target.value);
          }}
        >
          <option value="title">Título</option>
          <option value="idUser">Usuario</option>
          <option value="createdAt">Fecha</option>
        </select>

        <select
          id="direction"
          value={direction}
          onChange={(event) => {
            setDirection(event.target.value);
          }}
        >
          <option value="DESC">Descendente</option>
          <option value="ASC">Ascendente</option>
        </select>
      </section>
      <section>
        <SearchCalendar
          setInitDate={setInitDate}
          setFinalDate={setFinalDate}
          initDate={initDate}
          finalDate={finalDate}
        />
      </section>
    </form>
  );
};
export default SearchForm;
