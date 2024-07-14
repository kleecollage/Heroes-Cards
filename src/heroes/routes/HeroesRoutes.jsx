import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../../ui"
import { DcPage, MarvelPage, SearchPage, HeroPage } from "../pages"

export const HeroesRoutes = () => {
    return (
      <>
            <Navbar />
            <div className="container">
                <Routes>              
                    <Route path="marvel" element={<MarvelPage />} />
                    <Route path="dc" element={<DcPage />} />
                    <Route path="search" element={ <SearchPage/>  } />
                    <Route path="hero/:id" element={<HeroPage />} /> 
                    {/* en la linea de arriba id puede tomar cualquier nombre */}

                    <Route path="/" element={<Navigate to="/marvel" />} />
                </Routes>       
            </div>            
            
      </>
  )
}