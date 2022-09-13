import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArchiveCard from '../components/ArchiveCard';
import PageLayout from '../components/PageLayout';
import { getArchive } from '../store/slices/authSlice';


const ArchivePage = () => {
  const { archiveList } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArchive());
  }, []);

  return (
    <PageLayout>
      {archiveList.slice().sort((a, b) => new Date(b?.createDate) - new Date(a?.createDate)).map(item => <ArchiveCard item={item} key={item.id} />)}
    </PageLayout>
  );
};

export default ArchivePage;