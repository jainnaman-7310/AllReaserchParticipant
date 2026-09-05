import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { getCheckSecurityPassedApi } from 'services/participantService';
// import { initializeDQC } from 'utils/security';
import { requestData } from 'utils/helpers';
import * as rdd from 'react-device-detect';
import { setBrowserData } from 'utils/utils';
import LazyLoad from './LazyLoad';

const Layout = lazy(() => import('./components/Layouts/index'));
const Home = lazy(() => import('./pages/Home/Home'));

function AppRoutes() {
  const [headerState, setHeaderState] = useState(false);
  const request = requestData(window);
  const browserData = setBrowserData(rdd, request);
  const [browserInfo] = useState(browserData);
  const [dataSecurityLoader, setDataSecurityLoader] = useState(true);

  useEffect(() => {
    const checkSecurity = async () => {
      if (request.vendorId && request.userLandingUrl) {
        setDataSecurityLoader(true);
        const dqcResponse = { dqc: null, isCached: true };
        // if (process.env.NODE_ENV === 'production') {
        //   dqcResponse = await initializeDQC(request.studyId);
        // }
        try {
          const result = await getCheckSecurityPassedApi({
            sid: request.studyId,
            vendorId: request.vendorId,
            userLandingUrl: request.userLandingUrl,
            browserData: JSON.stringify(browserInfo),
            dqcSecurityData: dqcResponse,
          });
          if (result?.data && result?.data?.surveyParticipantId) {
            localStorage.setItem('spfjkshdfjbnvcbj', result?.data?.surveyParticipantId);
          }
          if (result?.data?.success && result.data.redirectUrl) {
            window.location.href = result.data.redirectUrl;
          } else {
            setDataSecurityLoader(false);
          }
          if (result?.data?.isHeaderByPass) {
            setHeaderState(true);
          }
        } catch (error) {
          setDataSecurityLoader(false);
        }
      } else {
        // No check needed
        setDataSecurityLoader(false);
      }
    };

    checkSecurity();
  }, [request.userLandingUrl]);

  if (dataSecurityLoader) {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4'>
        <div className='animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-[#5a6df5] mb-6' />
      </div>
    );
  }
  return (
    <Suspense fallback={<LazyLoad />}>
      <Routes>
        <Route path='/' element={<Layout headerState={headerState} />}>
          <Route index element={<Home setHeaderState={setHeaderState} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default AppRoutes;
