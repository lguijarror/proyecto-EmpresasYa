
import Breadcrumb from 'react-bootstrap/Breadcrumb';


const BreadCrumb = ({pages}) => {
    return (
        <>
          <Breadcrumb className='mt-4 mb-2'  >
            <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
            {pages.map((page,index) => (
                
                    index !== pages.length - 1  ? (<Breadcrumb.Item href={page.link} key={page.page}>{page.page}</Breadcrumb.Item>) : (<Breadcrumb.Item active key={page.page}>{page.page}</Breadcrumb.Item>)

            ))}
            
        </Breadcrumb>
        </>
  
    );
}

export default BreadCrumb;