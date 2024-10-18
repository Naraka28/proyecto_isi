import { faPlus, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../components/DashButton';
import { ProductTable } from "../components/TableProducts";
import { Search } from '../components/Search';
import {ModalProducts} from '../components/ModalProducts';


export function Products(){
    const handleAddClick = () => {
        throw new Error('Function not implemented.');
      }

        return(
          <>
            <div className=''>

               <div className="container px-6 mx-auto grid">
                 <h2 className="my-6 text-3xl font-semibold text-black ">
                   Dashboard - Productos

                 </h2>

                 <Search className='hidden sm:flex'/>
                  <div className='flex space-x-3 my-5'>
                  <ModalProducts />

                  <IconButton id={'respaldoBtn'} text={'Respaldo'} icon={faCloudArrowUp} onClick={handleAddClick}/>

                  </div>
                  <div className=''>
                    <ProductTable />
                </div>
               </div>
            </div>
            </>
         );

}