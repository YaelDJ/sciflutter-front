import ReturnButtons from "@/app/_components/returnButtons";
import { HouseSimple } from "@phosphor-icons/react";
import Link from "next/link";

import '@/styles/components/requested-window.scss'

const Requested: React.FC = () => {
  return (
    <div className="c-requested-window">
      <div className="c-requested-window__message">
        <h2 className="c-requested-window__heading">Your publish has been requested</h2>

        <p>
          La publicacion de tu articulo fue solicitada, en unos dias recibiras
          una notificacion con la respuesta a tu peticion, recuerda que en este tiempo no puedes copiar o solicitar otra publicacion de este borrador. En caso de tener
          dudas puedes contactarte con el soporte tecnico en la pestaña de
          ayuda.
        </p>
      </div>

      <ReturnButtons>
        <Link href="/">
          <HouseSimple size={24} /> Home
        </Link>
      </ReturnButtons>
    </div>
  );
}

export default Requested