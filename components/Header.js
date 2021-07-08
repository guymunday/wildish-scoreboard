import styled from "styled-components"
import logo from "../assets/images/wildish-logo-full.svg"
import Link from "next/link"
import { useRouter } from "next/router"

const StyledHeader = styled.header`
  width: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  .header_logo {
    max-height: 50px;
  }
  .header_inner {
    display: flex;
    p {
      margin-right: 20px;
    }
  }
`

export default function Header() {
  const router = useRouter()
  const { pathname } = router
  return (
    <>
      <StyledHeader className="black">
        <h1 className="element-invisible">Wildish & Co</h1>
        <img className="header_logo" src={logo} alt="logo" />
        <div className="header_inner">
          <p>Scoreboard v1</p>
          {pathname !== "/vs" ? (
            <Link href="/vs">VS</Link>
          ) : (
            <Link href="/">Scores</Link>
          )}
        </div>
      </StyledHeader>
    </>
  )
}
