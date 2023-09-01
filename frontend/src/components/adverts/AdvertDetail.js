import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";

const AdvertDetail = (props) => {
  const params = useParams();
  console.log(params);
  return (
    <Layout title="Detalle de anuncio">
      <div>detalle de anuncio </div>
    </Layout>
  );
};

export default AdvertDetail;
