import React, { useState, useEffect } from 'react';
import {
  Logo,
  MenuToggle,
  Badge,
  Twitter,
  Discord,
  Github,
  ThemeToggle
} from '@components';
import cn from 'classnames';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import {
  Row,
  Col,
  Spacer,
  Link,
  useTheme,
  useBodyScroll
} from '@nextui-org/react';
import { Route } from '@lib/docs/page';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@hooks/use-media-query';
import { addColorAlpha } from '@utils/index';
import { isActive } from '@utils/links';

export interface Props {
  isHome?: boolean;
  detached?: boolean;
  routes?: Route[];
}

const MobileNavigation = dynamic(
  () => import('../components/mobile-navigation'),
  {
    ssr: false
  }
);

const SearchInput = dynamic(
  () => import('../components/search/instant-search'),
  {
    ssr: true
  }
);

const Navbar: React.FC<Props> = ({ detached, routes }) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const { theme, isDark } = useTheme();
  const isMobile = useMediaQuery(960);
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true });

  useEffect(() => {
    if (!isMobile) {
      setExpanded(false);
      setBodyHidden(false);
    }
  }, [isMobile]);

  const onToggleNavigation = () => {
    setExpanded(!expanded);
    isMobile && setBodyHidden(!expanded);
  };

  const showBlur = !!expanded || !!detached;
  return (
    <nav className="navbar__container">
      <div className="navbar__wrapper">
        <Col
          className="navbar__logo-container"
          css={{
            '@mdMax': {
              width: '100%'
            }
          }}
        >
          <Row justify="flex-start" align="center">
            <NextLink href="/">
              <Link>
                <Logo auto className="navbar__logo" />
              </Link>
            </NextLink>
            <Spacer x={0.4} />
            <Badge
              css={{
                '@mdMax': {
                  display: 'none'
                }
              }}
              type="warning"
            >
              Alpha
            </Badge>
          </Row>
        </Col>
        <Col className="navbar__resources-container">
          <Row justify="center" align="center">
            <Spacer x={1} y={0} />
            <NextLink href="/docs/guide/getting-started">
              <Link
                className={cn('navbar__link', {
                  active: isActive(router.pathname, '/docs/[[...slug]]')
                })}
                href="#"
                css={{
                  color: '$text'
                }}
              >
                Docs
              </Link>
            </NextLink>
            <Spacer x={1} y={0} />
            <NextLink href="#">
              <Link
                aria-disabled
                className="navbar__disabled-link"
                href="#"
                title="Coming soon.."
                css={{
                  color: '$text'
                }}
              >
                Contributors
              </Link>
            </NextLink>
            <Spacer x={1} y={0} />
            <NextLink href="#">
              <Link
                aria-disabled
                className="navbar__disabled-link"
                href="#"
                title="Coming soon.."
                css={{
                  color: '$text'
                }}
              >
                Feedback
              </Link>
            </NextLink>
          </Row>
        </Col>
        <Col className="navbar__search-container">
          <Row className="navbar__search-row" justify="flex-end" align="center">
            <Row
              className="navbar__social-icons-container"
              justify="flex-end"
              align="center"
              gap={1}
            >
              <Link
                className="navbar__social-icon"
                href="https://twitter.com/getnextui"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter
                  size={20}
                  fill={
                    isDark
                      ? theme?.colors?.accents6?.value
                      : theme?.colors?.accents4?.value
                  }
                />
              </Link>
              <Link
                className="navbar__social-icon"
                href="https://discord.gg/9b6yyZKmH4"
                target="_blank"
                rel="noreferrer"
              >
                <Discord
                  size={20}
                  fill={
                    isDark
                      ? theme?.colors?.accents6?.value
                      : theme?.colors?.accents4?.value
                  }
                />
              </Link>
              <Link
                className="navbar__social-icon"
                href="https://github.com/nextui-org/nextui"
                target="_blank"
                rel="noreferrer"
              >
                <Github
                  size={20}
                  fill={
                    isDark
                      ? theme?.colors?.accents6?.value
                      : theme?.colors?.accents4?.value
                  }
                />
              </Link>
              <ThemeToggle className="navbar__social-icon" />
            </Row>
            <SearchInput />
          </Row>
        </Col>
        <Col className="navbar__menu-container">
          <ThemeToggle className="navbar__social-icon-mobile" />
          <div
            className="navbar__menu-arrow noselect"
            onClick={onToggleNavigation}
          >
            <MenuToggle expanded={expanded} />
          </div>
        </Col>
        <MobileNavigation
          routes={routes}
          opened={expanded}
          onClose={() => {
            setExpanded(false);
            setBodyHidden(false);
          }}
        />
      </div>
      <style jsx>{`
        .navbar__container,
        .navbar__wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .navbar__container {
          min-height: 64px;
          max-height: 64px;
          z-index: 9999;
        }
        :global(.navbar__search-row) {
          position: initial !important;
        }
        :global(.navbar__logo) {
          cursor: pointer;
          transition: all 0.25s ease;
        }
        :global(.navbar__social-icons-container) {
          width: initial !important;
        }
        :global(.navbar__link.active) {
          font-weight: 600;
          color: ${theme?.colors?.primary?.value};
        }
        :global(.navbar__menu-arrow) {
          height: 100%;
          min-height: 40px;
          min-width: 30px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        :global(.navbar__menu-container) {
          width: 100%;
          height: 100%;
          display: none;
        }
        :global(.navbar__social-icon) {
          margin: 0 6px;
        }
        :global(.navbar__social-icon-mobile) {
          margin: 0;
        }
        :global(.navbar__social-icon svg) {
          transition: all 0.25s ease;
        }
        :global(.navbar__social-icon:hover svg) {
          opacity: 0.7;
        }
        :global(.navbar__disabled-link) {
          cursor: not-allowed;
          events: none;
        }
        @media only screen and (max-width: ${theme?.breakpoints.xs.value}) {
          :global(.navbar__container) {
            top: 0;
            position: fixed;
            background: ${showBlur
              ? addColorAlpha(theme?.colors.background.value, 0.6)
              : 'transparent'};
            box-shadow: ${detached
              ? '0px 5px 20px -5px rgba(2, 1, 1, 0.1)'
              : 'none'};
            min-height: 64px;
            max-height: 64px;
          }
          :global(.navbar__search-row) {
            justify-content: center;
          }
          @supports (
            (-webkit-backdrop-filter: blur(10px)) or
              (backdrop-filter: blur(10px))
          ) {
            :global(.navbar__container) {
              backdrop-filter: ${showBlur
                ? 'saturate(180%) blur(10px)'
                : 'none'};
            }
          }
          @supports (
            not (-webkit-backdrop-filter: blur(10px)) and not
              (backdrop-filter: blur(10px))
          ) {
            :global(.navbar__container) {
              background: ${theme?.colors.background.value};
            }
          }
          :global(.navbar__logo-container a:active) {
            opacity: 0.7;
          }
        }
        @media only screen and (max-width: ${theme?.breakpoints.md.value}) {
          :global(.navbar__menu-container) {
            display: flex;
            justify-content: flex-end;
          }
          :global(.navbar__resources-container) {
            display: none;
          }
          :global(.navbar__version-badge, .navbar__social-icons-container) {
            display: none !important;
          }
        }
        @media only screen and (max-width: ${theme?.breakpoints.lg.value}) {
          .navbar__wrapper {
            padding: 0 16px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;