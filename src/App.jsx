import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { About } from './pages/About/About'
import { MainLayout } from './layouts/MainLayout/MainLayout'
import { TopRatedMovies } from './pages/TopRatedMovies/TopRatedMovies'
import { TopRatedTvShows } from './pages/TopRatedTvShows/TopRatedTvShows'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/top-rated-tv-shows' element={<TopRatedTvShows />} />
      <Route path='/top-rated-mvoies' element={<TopRatedMovies />} />
    </Route>
  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
