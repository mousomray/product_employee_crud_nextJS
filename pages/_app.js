import "@/styles/globals.css";
import Wrapper from "./Layout/Wrapper";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // For React Query
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {

  // Create Query Client For React Query
  const queryClient = new QueryClient()

  return (
    <>
      <ToastContainer />
      {/*Cover with QueryClientProvider*/}
      <QueryClientProvider client={queryClient}>
        <Wrapper>
          <Component>
            {pageProps}
          </Component>
        </Wrapper>
      </QueryClientProvider>
    </>
  )

}