import { Card, Header } from "../../components";
const AddChildMenu = () => {
  return (
    <div>
      <Header
        heading="Child Menus"
        subheading="This page provides the configuration for child menus that will be shown in shop"
      />

      <Card>
        <div className="mt-4 p-4 ">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select Sub Menus</span>
            </label>
            <select className="select select-primary">
              <option disabled selected>
                {" "}
                Select sub menu
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Child Menu Title</span>
            </label>
            <input className="input input-primary" type="text" name="" id="" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AddChildMenu;
