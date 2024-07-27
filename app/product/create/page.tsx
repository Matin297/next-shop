import { createProduct } from "@/actions";

export default function CreateProduct() {
  return (
    <form action={createProduct} className="space-y-4">
      <h2 className="text-lg font-semibold text-primary">
        Product Information
      </h2>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Name</span>
        </div>
        <input name="name" className="input input-bordered w-full" />
      </label>

      <label className="form-control">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <textarea
          name="description"
          className="textarea textarea-bordered h-24"
        ></textarea>
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Image URL</span>
        </div>
        <input
          name="imageURL"
          type="url"
          className="input input-bordered w-full"
        />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Price</span>
        </div>
        <input
          name="price"
          type="number"
          className="input input-bordered w-full"
        />
      </label>

      <button className="btn btn-primary w-full" type="submit">
        Submit
      </button>
    </form>
  );
}
