import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const ScrollToTop = ({children, location : {pathName}}: any) => {
    useEffect(() => {
        window.scroll(0,0);
    }, [pathName])
    return children;
}

export default withRouter(ScrollToTop);
