import React, { useState, useEffect } from "react";
import {
	FieldErrors,
	UseFormRegister,
	Controller,
	Control,
} from "react-hook-form";
import { useGetAllTypesQuery } from "@/redux/type/typeApi";

import ReactSelect, { GroupBase } from "react-select";
import ErrorMsg from "../../common/error-msg";
import Loading from "../../common/loading";
// prop type
type IPropType = {
	register?: UseFormRegister<any>; // optional
	errors?: FieldErrors<any>;       // optional
	control: Control;                // required
	setSelectType: React.Dispatch<React.SetStateAction<{ name?: string; id?: string }>>; // optional ✅
	default_value?: {
		type?: string; // optional inside optional
	};
};


const ProductType = ({
	errors,
	control,
	setSelectType,
	default_value,
}: IPropType) => {
	const { data: types, isError, isLoading } = useGetAllTypesQuery();
	const [hasDefaultValues, setHasDefaultValues] = useState<boolean>(false);

	// default value set
	useEffect(() => {
		if (default_value?.type && !hasDefaultValues && types?.result) {
			// Handle case where type is an ID
			const type = types.result.find((t) => t._id === default_value.type || t.name === default_value.type);
			if (type) {
				setSelectType({ id: type._id, name: type.name });
				setHasDefaultValues(true);
			}
		}
	}, [default_value, types, hasDefaultValues, setSelectType]);

	// decide what to render
	let content = null;
	if (isLoading) {
		content = (
			<div className="mb-5">
				<p className="mb-0 text-base text-black">Loading...</p>
				<Loading loading={isLoading} spinner="scale" />
			</div>
		);
	}
	if (!isLoading && isError) {
		content = <ErrorMsg msg="There was an error" />;
	}
	if (!isLoading && !isError && types?.success) {
		const typeItems = types.result;

		// handleTypeChange
		const handleTypeChange = (selectType: string) => {
			const type = typeItems.find((t) => t.name === selectType);
			if (type) {
				setSelectType({ id: type._id, name: type.name });
			}
		};

		const option = typeItems.map((t) => ({
			value: t.name,
			label: t.name,
		})) as unknown as readonly (string | GroupBase<string>)[];

		// Find the default type name from the items if we have an ID
		let defaultTypeValue = {
			label: "Select..",
			value: ""
		};

		if (default_value?.type && typeItems.length > 0) {
			const defaultType = typeItems.find(t => t._id === default_value.type || t.name === default_value.type);
			if (defaultType) {
				defaultTypeValue = {
					label: defaultType.name,
					value: defaultType.name
				};
			}
		}

		content = (
			<div className="mb-5">
				<p className="mb-0 text-base text-black">Product Types <span className="text-red">*</span></p>
				<Controller
					name="type"
					control={control}
					rules={{
						required: default_value?.type ? false : "Type is required!"
					}}
					render={({ field }) => (
						<ReactSelect
							{...field}
							value={field.value || defaultTypeValue}
							defaultValue={defaultTypeValue}
							onChange={(selectedOption) => {
								field.onChange(selectedOption);
								handleTypeChange(selectedOption?.value);
							}}
							options={option}
						/>
					)}
				/>
				<ErrorMsg msg={errors?.type?.message as string} />
				<span className="text-tiny leading-4">Set the product Type.</span>
			</div>
		);
	}
	return (
		<div>
			{content}
		</div>
	);
};

export default ProductType;