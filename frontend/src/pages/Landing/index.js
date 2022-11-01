import EnlaceList from "../../components/EnlaceList";
import useLinks from "../../hooks/useLinks";
import Spinner from "../../components/Spinner";
import SearchForm from "../../components/SearchForm/index";
import useTopLinks from "../../hooks/useTopLinks";
import TopFiveLinksList from "../../components/TopFiveLinksList";

const Landing = () => {
  const { links, loading, deleteLink, searchParams, setSearchParams } =
    useLinks();
  const { topLinks, loadingTopLinks } = useTopLinks();

  return (
    <>
      <h2>Top Triforce</h2>
      {loadingTopLinks && <Spinner />}

      {topLinks.length > 0 && <TopFiveLinksList topLinks={topLinks} />}

      <h2>Enlaces</h2>
      <SearchForm
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      {loading && <Spinner />}

      {links.length > 0 && (
        <EnlaceList enlaces={links} deleteLink={deleteLink} />
      )}
    </>
  );
};

export default Landing;
