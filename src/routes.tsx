import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Game from './pages/Game'
import NewGame from './pages/NewGame'

import Layout from './Layout'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<Layout />}>
          <Route path="/novo-jogo" element={<NewGame />} />
          <Route path="/jogo/:gameId" element={<Game />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
