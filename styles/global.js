import { css } from "styled-components"

const global = css`
  :root {
    --black: #000;
    --white: #fff;
    --yellow: #fade2b;
  }

  * {
    font-family: "Mabry Pro";
    ::selection {
      color: var(--black);
      background: var(--yellow);
    }
  }

  body {
    font-family: "Mabry Pro";
    font-style: normal;
    font-size: 20px;
    width: 100%;
    height: 100%;
    /* overflow-x: hidden; */
    position: relative;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    font-weight: 400 !important;
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  }

  button {
    cursor: pointer;
    min-width: 50px;
    background: black;
    outline: none;
    border: 1px solid black;
    padding: 10px 15px;
    color: white;
    font-size: inherit;
    border-radius: 25px;
    transition: 0.3s ease all;
    line-height: 1;
    :hover {
      color: black;
      background: var(--yellow);
      border: 1px solid black;
    }
    :focus {
      outline: none;
      box-shadow: 0px 0px 10px 5px white;
    }
  }

  a,
  .link {
    color: inherit;
    text-decoration: none;

    background-image: linear-gradient(var(--yellow), var(--yellow));
    background-position: 0% 100%;
    background-repeat: no-repeat;
    background-size: 100% 2px;
    transition: background-size 0.3s;
  }

  a:hover,
  a:focus {
    background-size: 100% 80%;
  }

  a.nostyle {
    text-decoration: none;
    color: inherit;
    font-size: inherit;
    position: relative;
    background: none;
    &::before {
      content: "";
      display: none;
    }
  }

  h1 {
    font-size: 3rem;
    @media screen and (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  h2 {
    font-size: 2.2rem;
    @media screen and (max-width: 768px) {
      font-size: 1.8rem;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 400;
    line-height: 1;
    strong {
      font-weight: 400;
      position: relative;
      z-index: 1;
      background: rgb(255, 255, 255);
      background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 1) 80%,
        rgba(255, 255, 255, 0) 80%
      );
    }
  }

  .html {
    * {
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-word;
    }
    *:not(li) {
      margin: 0 0 20px 0;
      &:last-child {
        margin: 0;
      }
    }
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  @keyframes marquee-left {
    from {
      transform: translateX(0%);
    }

    to {
      transform: translateX(-30%);
    }
  }

  @keyframes marquee-right {
    from {
      transform: translateX(0%);
    }

    to {
      transform: translateX(30%);
    }
  }

  li {
    margin-left: 2rem;
  }

  .black {
    background: var(--black);
    color: var(--white);
    strong {
      color: var(--yellow);
      background: transparent;
    }
  }

  .yellow {
    background: var(--yellow);
  }

  .white {
    background: #fff;
    strong {
      background: rgba(250, 222, 43, 1);
      background: linear-gradient(
        0deg,
        rgba(250, 222, 43, 1) 80%,
        rgba(250, 222, 43, 0) 80%
      );
    }
  }

  .element-invisible {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
  }
`

export default global
