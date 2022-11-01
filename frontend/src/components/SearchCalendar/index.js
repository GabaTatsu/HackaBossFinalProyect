const SearchCalendar = (props) => {
  const { initDate, setInitDate, finalDate, setFinalDate } = props;

  return (
    <>
      <label htmlFor="initDate">Fecha de inicio:</label>
      <input
        id="initDate"
        type="date"
        value={initDate}
        onChange={(event) => {
          setInitDate(event.target.value);
        }}
      ></input>
      <label htmlFor="finalDate">Fecha final:</label>
      <input
        id="finalDate"
        type="date"
        value={finalDate}
        onChange={(event) => {
          setFinalDate(event.target.value);
        }}
      ></input>
    </>
  );
};
export default SearchCalendar;
