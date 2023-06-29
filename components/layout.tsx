import SideBarItem from "./SidebarItem"
import { ISidebarItem } from "./types"

export default function Layout({ children }: { children: any }) {
  const menuItems: ISidebarItem[] = [
    {
      href: "/proyectos",
      title: "Proyectos",
    },
    {
      href: "/soporte",
      title: "Soporte",
    },
    {
      href: "/recursos",
      title: "Recursos",
    }
  ] 

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header style={{ backgroundColor: "purple", fontSize: "1.4em"}} className="sticky h-14 flex justify-center items-center font-semibold  text-white">
        PSA
      </header>
      <div className="flex flex-col md:flex-row flex-1 bg-white">
        <aside className="bg-grey-100 w-full md:w-60">
          <nav>
            <ul>
              {menuItems.map((item) => (
                <SideBarItem {...item} key={item.title} />
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
