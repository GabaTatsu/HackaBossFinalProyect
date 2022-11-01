import TopFiveLink from "../TopFiveLink";
import trifuerza1 from "../../assets/images/trifuerza1.png";
import trifuerza2 from "../../assets/images/trifuerza2.png";
import trifuerza3 from "../../assets/images/trifuerza3.png";
import trifuerza4 from "../../assets/images/trifuerza4.png";
import "./style.css";
const TopFiveLinksList = ({ topLinks }) => {
  return (
    <>
      <div className="trifuerzaanimacion">
        <img src={trifuerza1} alt="trifuerza1"></img>
        <img src={trifuerza2} alt="trifuerza2"></img>
        <img src={trifuerza3} alt="trifuerza3"></img>
        <img src={trifuerza4} alt="trifuerza4"></img>
      </div>
      <ul className="topfivelist">
        {topLinks.map((topLink, key) => {
          return (
            <li key={topLink.id}>
              <TopFiveLink topLink={topLink} index={key + 1} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default TopFiveLinksList;
