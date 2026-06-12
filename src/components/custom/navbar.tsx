import { Navbar, NavBody, NavItems, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, NavbarLogo, ThemeToggle } from "@/components/ui/resizable-navbar"
import { Link } from "@tanstack/react-router"
import { useState } from "react"

const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
]

export function ResizableNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <div className="relative w-full">
            <Navbar>
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="relative z-20 flex items-center gap-2">
                        <ThemeToggle />
                    </div>
                </NavBody>

                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-all duration-200"
                                activeProps={{ className: "text-primary! bg-primary/10!" }}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="w-full px-4 pt-2 border-t border-primary/10">
                            <ThemeToggle />
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    )
}
