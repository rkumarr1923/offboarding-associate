import { yupResolver } from "@hookform/resolvers/yup";
import { SignalCellularConnectedNoInternet0BarSharp } from "@mui/icons-material";
import react, { ComponentType } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AnyObjectSchema } from "yup";

export const withForm = function <ComponentProps, Keys>(
    Component: ComponentType<ComponentProps>,
    validationSchema: AnyObjectSchema,
    defaultValues?: any,
) {
    return (
        hocProps: Omit<
            ComponentProps,
            "control" | "error" | "setValue" | "getValues" | "trigger"
        >,
    ) => {
        const {
            handleSubmit,
            control,
            formState,
            setValue,
            getValues,
            trigger,
        } = useForm<any>({
            mode: "all",
            resolver: yupResolver(validationSchema),
            ...(defaultValues
                ? { defaultValues: cloneDeep(defaultValues) }
                : {}),
        });

        const onSubmit: SubmitHandler<any> = () => { };

        return (
            <form>
                <Component
                    {...(hocProps as ComponentProps)}
                    control={control}
                    error={formState.errors}
                    setValue={setValue}
                    getValues={getValues}
                    trigger={trigger}
                />
                <button type="submit" onClick={handleSubmit(onSubmit)}></button>
            </form>
        );
    };
};

export const cloneDeep = (defaultValues: any) => {
    return JSON.parse(JSON.stringify(defaultValues));
};
