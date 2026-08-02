import { useEffect, useRef, useState } from 'react'

import { NAV_SECTION_IDS } from '../../constants'
import { close, menu } from '../../assets'
import { mostVisibleSectionId } from '../../lib/activeSection'
import { styles } from '../../styles'
import { t } from '../../lib/i18n'

const SCROLLED_PAST_PX = 100
const SECTION_VISIBILITY_THRESHOLDS = [0, 0.1, 0.25, 0.5, 0.75, 1]
const ROOT_MARGIN_DISCOUNTING_NAVBAR_AND_LOWER_THIRD = '-80px 0px -35% 0px'

const sectionContainingAnchor = anchorId => {
  const anchor = document.getElementById(anchorId)
  if (!anchor) return null

  return anchor.closest('section') ?? anchor
}

const useScrolledPastHero = () => {
  const [scrolled, setScrolled] = useState(false)
  const scrolledRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > SCROLLED_PAST_PX
      if (isScrolled === scrolledRef.current) return

      scrolledRef.current = isScrolled
      setScrolled(isScrolled)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrolled
}

const useActiveSectionId = sectionIds => {
  const [activeId, setActiveId] = useState(sectionIds[0])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined

    const nodeBySectionId = new Map(
      sectionIds
        .map(sectionId => [sectionId, sectionContainingAnchor(sectionId)])
        .filter(([, node]) => node)
    )
    if (nodeBySectionId.size === 0) return undefined

    const sectionIdByNode = new Map(
      [...nodeBySectionId].map(([sectionId, node]) => [node, sectionId])
    )
    const visibilityRatioBySectionId = new Map()

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const sectionId = sectionIdByNode.get(entry.target)
          if (!sectionId) return

          visibilityRatioBySectionId.set(
            sectionId,
            entry.isIntersecting ? entry.intersectionRatio : 0
          )
        })

        const nextActiveId = mostVisibleSectionId(visibilityRatioBySectionId)
        if (nextActiveId) setActiveId(nextActiveId)
      },
      {
        threshold: SECTION_VISIBILITY_THRESHOLDS,
        rootMargin: ROOT_MARGIN_DISCOUNTING_NAVBAR_AND_LOWER_THIRD,
      }
    )

    nodeBySectionId.forEach(node => observer.observe(node))

    return () => observer.disconnect()
  }, [sectionIds])

  return [activeId, setActiveId]
}

const NavLinks = ({ activeId, onNavigate, listClassName, itemClassName, linkClassName }) => (
  <ul className={listClassName}>
    {NAV_SECTION_IDS.map(sectionId => {
      const isActive = activeId === sectionId

      return (
        <li
          key={sectionId}
          className={`${itemClassName} ${isActive ? 'text-white' : 'text-secondary'}`}
        >
          <a
            href={`#${sectionId}`}
            className={linkClassName}
            aria-current={isActive ? 'page' : undefined}
            onClick={event => onNavigate(event, sectionId)}
          >
            {t(`nav.${sectionId}`)}
          </a>
        </li>
      )
    })}
  </ul>
)

const Navbar = () => {
  const scrolled = useScrolledPastHero()
  const [activeId, setActiveId] = useActiveSectionId(NAV_SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)

  const goToSection = (event, sectionId) => {
    event.preventDefault()

    const target = document.getElementById(sectionId)
    if (!target) return

    setActiveId(sectionId)
    setMenuOpen(false)

    const nextHash = `#${encodeURIComponent(sectionId)}`
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash)
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? 'bg-primary' : 'bg-transparent'
      }`}
    >
      <div className='w-full flex justify-end items-center'>
        <NavLinks
          activeId={activeId}
          onNavigate={goToSection}
          listClassName='list-none hidden sm:flex flex-row gap-10'
          itemClassName='hover:text-white text-[18px] font-medium cursor-pointer'
        />

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button
            type='button'
            aria-label={t('nav.menu')}
            aria-expanded={menuOpen}
            className='flex h-[40px] w-[40px] items-center justify-center'
            onClick={() => setMenuOpen(previous => !previous)}
          >
            <img
              src={menuOpen ? close : menu}
              alt=''
              aria-hidden='true'
              className='w-[28px] h-[28px] object-contain'
            />
          </button>

          <div
            className={`${
              menuOpen ? 'flex' : 'hidden'
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <NavLinks
              activeId={activeId}
              onNavigate={goToSection}
              listClassName='list-none flex justify-end items-start flex-1 flex-col gap-4'
              itemClassName='font-poppins font-medium cursor-pointer text-[16px]'
              linkClassName='inline-block min-h-[24px] py-[1px]'
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
