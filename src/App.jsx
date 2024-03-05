import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Home, loader as HomeLoader } from './pages/Home/Home'
import { About } from './pages/About/About'
import { MainLayout } from './layouts/MainLayout/MainLayout'
import { TopRatedMovies } from './pages/TopRatedMovies/TopRatedMovies'
import { TopRatedTvShows } from './pages/TopRatedTvShows/TopRatedTvShows'
import { DetailsPage, loader as DetailsLoader  } from './pages/Details/DetailsPage'


function App() {

	const router = createBrowserRouter(createRoutesFromElements(
		<Route path="/" element={<MainLayout />}>
			<Route index element={<Home />} loader={HomeLoader}/>
			<Route path='/about' element={<About />} />
			<Route path='/top-rated-tv-shows' element={<TopRatedTvShows />} />
			<Route path='/top-rated-mvoies' element={<TopRatedMovies />} />
			<Route path='/details/:cat/:id' element={<DetailsPage />} loader={DetailsLoader}/>
		</Route>
	))

	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}

export default App
