import { Outlet } from "react-router-dom"
import { Header } from "../../components/Header.jsx/Header"
import { HeaderMobile } from "../../components/HeaderMobile/HeaderMobile"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import { MarginWidthWrapper } from "../MarginWidthWrapper/MarginWidthWrapper"
import { PageWrapper } from "../PageWrapper/PageWrapper"

export const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />
          <PageWrapper>
            <Outlet />
          </PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  )
}

