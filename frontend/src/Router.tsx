import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { InvoicesHistory } from './pages/InvoicesHistory'
import { Upload } from './pages/Upload'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<InvoicesHistory />} />
        <Route path="/upload" element={<Upload />} />
      </Route>
    </Routes>
  )
}
