import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArchiveCard from "../components/ArchiveCard";
import PageLayout from "../components/PageLayout";
import { getArchive } from "../store/slices/authSlice";
import Loader from "../components/Loader/Loader";
import Pagination from "antd/es/pagination";

const ArchivePage = () => {
  const { archiveList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArchive());
  }, []);

  return (
    <PageLayout>
      {archiveList
        .slice()
        .sort((a, b) => new Date(b?.createDate) - new Date(a?.createDate))
        .map((item) => (
          <ArchiveCard item={item} key={item.id} />
        ))}
      <Pagination
        className="pagination"
        defaultCurrent={1}
        total={100}
        defaultPageSize={10}
      />
    </PageLayout>
  );
};

export default ArchivePage;
