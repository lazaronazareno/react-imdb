import { useEffect, useState } from "react";

function Footer() {
  const [token, setToken] = useState()

  useEffect(() => {
    let token = sessionStorage.getItem('token')
    setToken(token)
  }, []);

  return (
    <>
      {!token && (
        <footer className=" w-full mx-auto max-w-7xl px-4 sm:px-6 bg-primary-900 text-primary-50">
          <nav className="w-full flex items-center justify-between md:justify-start md:space-x-10">
            <p className="mr-auto" >Copyright Alkemy</p>
            <a href="https://github.com/lazaronazareno" rel="noopener noreferrer">Github</a>
          </nav>
        </footer>
      )}
      {token && (
        <footer className="mx-auto max-w-7xl px-4 sm:px-6 bg-primary-900 text-primary-50">
          <nav className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="https://github.com/lazaronazareno" rel="noopener noreferrer">Github</a>
            </div>
            <p>Copyright The Movie Database (TMDB) API</p>
          </nav>
        </footer>
      )}
    </>
  )
}

export default Footer;