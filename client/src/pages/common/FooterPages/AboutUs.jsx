import { Header } from "../../../components";
const AboutUs = () => {
  return (
    <div className="mt-4">
      <Header
        heading="About Us"
        subheading="This page provides information about souvnirs as brand"
      />
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-base-200 rounded-xl p-4 col-span-1 border">
            <h2 className="text-2xl font-semibold">About Us</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat,
              esse temporibus. Odit corporis laborum quisquam impedit, nihil
              repellendus explicabo id reprehenderit exercitationem numquam
              porro veniam rem fuga? Assumenda deleniti adipisci voluptas velit,
              libero enim, voluptatum nostrum error pariatur laboriosam
              accusantium! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Autem labore eius ex ducimus architecto? Nihil autem dolor
              eligendi ea error, totam animi, iste illum delectus culpa, rerum
              voluptatibus pariatur excepturi!
            </p>
          </div>
          <div className="bg-base-200 rounded-xl p-4 col-span-1 border">
            <h2 className="text-2xl font-semibold">International Buyers</h2>
            <p>
              All orders shipped to countries outside the U.S. may be subject to
              import taxes, customs duties, and fees that are paid by the buyer.
              The value of payment received cannot be altered to decrease
              international custom fees. Additional charges for customs
              clearance must be paid by the buyer at the time of pick up. We
              have no control over these charges. Customs policies vary widely
              from country to country, and you should contact your local customs
              office for further information. When customs clearance procedures
              are required, it can cause delays beyound our control and beyond
              the original delivery estimates. Feel free to contact your local
              customs office for further information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
