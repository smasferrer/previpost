import { NavLink, useLocation } from 'react-router'
import { navigationItems } from '../../../router/navigationItems'
import AppLogo from '../brand/AppLogo'

const baseLinkClassName =
  'relative block rounded-[var(--radius-sm)] border border-transparent px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/50'

function AppSidebar() {
  const { pathname, search } = useLocation()

  return (
    <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-background-muted)] px-4 py-5 text-[var(--color-text-primary)] lg:flex lg:flex-col">
      <NavLink
        aria-label="Ir al inicio de PreviPost"
        className="mb-8 inline-flex items-center px-2.5 py-2 transition hover:border-[var(--color-border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/50"
        to="/"
      >
        <AppLogo className="h-auto w-[146px]" />
      </NavLink>

      <nav aria-label="Consultas disponibles" className="space-y-7">
        {navigationItems.map((group) => (
          <section key={group.label}>
            <h2 className="mb-2 flex items-center gap-2 px-3 text-xs font-semibold uppercase tracking-wide text-[var(--app-sidebar-section-text)]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-[var(--radius-sm)] bg-[var(--app-sidebar-section-marker)]"
              />
              {group.label}
            </h2>

            <div className="space-y-1">
              {group.items.map((item) => {
                const isItemActive = item.isActive?.(pathname, search)

                return (
                  <NavLink
                    className={({ isActive }) =>
                      [
                        baseLinkClassName,
                        isItemActive ?? isActive
                          ? 'text-[var(--app-primary)] hover:text-[var(--color-primary-hover)]'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                      ].join(' ')
                    }
                    key={`${group.label}-${item.label}`}
                    to={item.to}
                  >
                    <span className="flex items-center justify-between gap-2 ml-3">
                      <span>{item.label}</span>
                    </span>
                  </NavLink>
                )
              })}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  )
}

export default AppSidebar
