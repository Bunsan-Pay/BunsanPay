import { ScrollToTop } from "../ui-own/scroll-to-top"
import Footer from "./Footer"
import { Header } from "./Header"

export const PageScaffold = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <Header />
            <main className="p-4 min-w-0">
                {children}
            </main>
            <ScrollToTop />
            <Footer />
        </div>
    )
}