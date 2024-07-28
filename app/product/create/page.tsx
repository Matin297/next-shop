"use client";

import cn from "classnames";
import { useFormState } from "react-dom";
import { createProduct } from "@/actions";
import FormSubmitButton from "@/components/form-submit-button";

export default function CreateProduct() {
  const [state, action] = useFormState(createProduct, {});

  return (
    <form action={action} className="space-y-4">
      <h2 className="text-lg font-semibold text-primary">
        Product Information
      </h2>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Name</span>
        </div>
        <input
          name="name"
          className={cn("input input-bordered w-full", {
            "input-error": state.errors?.name,
          })}
        />
        {state.errors?.name && (
          <div className="label">
            <span className="label-text-alt">
              {state.errors.name?.join(", ")}
            </span>
          </div>
        )}
      </label>

      <label className="form-control">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <textarea
          name="description"
          className={cn("textarea textarea-bordered h-24", {
            "textarea-error": state.errors?.description,
          })}
        ></textarea>
        {state.errors?.description && (
          <div className="label">
            <span className="label-text-alt">
              {state.errors.description.join(", ")}
            </span>
          </div>
        )}
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Image URL</span>
        </div>
        <input
          name="imageURL"
          type="url"
          className={cn("input input-bordered w-full", {
            "input-error": state.errors?.imageURL,
          })}
        />
        {state.errors?.imageURL && (
          <div className="label">
            <span className="label-text-alt">
              {state.errors.imageURL.join(", ")}
            </span>
          </div>
        )}
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Price</span>
        </div>
        <input
          name="price"
          type="number"
          className={cn("input input-bordered w-full", {
            "input-error": state.errors?.price,
          })}
        />
        {state.errors?.price && (
          <div className="label">
            <span className="label-text-alt">
              {state.errors.price.join(", ")}
            </span>
          </div>
        )}
      </label>

      <FormSubmitButton className="w-full">Submit</FormSubmitButton>
    </form>
  );
}
