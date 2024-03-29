"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const languages = [
  "Hindi",
  "Marathi",
  "Gujarati",
  "Tamil",
  "Punjabi",
  "English",
  "Spanish",
  "Japanese",
  "French",
  "German",
];

const FormSchema = z.object({
  languagesLearn: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one language.",
    }),
  languagesProficient: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one languages.",
    }),
});

type TFormSchema = z.infer<typeof FormSchema>;

export default function Onboarding() {
  const router = useRouter();
  const learnRef = useRef<HTMLDivElement>(null);
  const proficientRef = useRef<HTMLDivElement>(null);
  const form = useForm<TFormSchema>({
    // @ts-ignore
    resolver: zodResolver(FormSchema),
    defaultValues: {
      languagesLearn: [],
      languagesProficient: [],
    },
  });

  const onSubmit = async (values: TFormSchema) => {
    const response = await fetch("/api/language", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.replace("/dashboard");
  };

  return (
    <div className="bg-white ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" overflow-hidden h-screen"
        >
          <div ref={learnRef} className="py-8 grid grid-row-2 h-screen">
            <div className="flex w-full flex-col mx-auto px-16 max-w-7xl ">
              <div className="text-black text-3xl bg-white ">
                What would you like to learn?
              </div>
              <div className="w-full overflow-hidden">
                <div className="gap-20 flex max-md:flex-col h-full">
                  <div className="flex flex-col overflow-y-hidden h-full items-stretch w-[42%] ">
                    <div className="flex flex-col gap-4 mt-12 scroll ">
                      <FormField
                        control={form.control}
                        name="languagesLearn"
                        render={() => (
                          <FormItem>
                            <div className="h-[30rem] overflow-y-scroll space-y-2">
                              {languages.map((item) => (
                                <FormField
                                  key={item + "Learn"}
                                  control={form.control}
                                  name="languagesLearn"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item + "Learn"}
                                        className="flex"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            hidden
                                            checked={field.value?.includes(
                                              item
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    item,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== item
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel
                                          data-checked={field.value?.includes(
                                            item
                                          )}
                                          className="flex-1 cursor-pointer text-black text-center text-xl bg-fuchsia-100 self-stretch items-center py-5 px-16 rounded-3xl max-md:max-w-full max-md:px-5 data-[checked=true]:bg-fuchsia-300"
                                        >
                                          {item}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-[58%] ml-5 max-md:w-full max-md:ml-0">
                    <img
                      loading="lazy"
                      src="/learn.png"
                      className="aspect-[1.04] object-contain object-center w-full overflow-hidden grow max-md:max-w-full max-md:mt-10"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="self-center flex w-full max-w-7xl items-center justify-end px-14 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
              <button
                onClick={async () => {
                  await form.trigger("languagesLearn");
                  if (form.getFieldState("languagesLearn").invalid) {
                    return;
                  }
                  proficientRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                type="button"
                className="flex-col text-black text-1xl relative bg-fuchsia-200 overflow-hidden rounded-full self-stretch justify-center items-stretch pl-8 pr-8 py-3 max-md:px-5 hover:bg-fuchsia-300 hover:underline"
              >
                Next
              </button>
            </div>
          </div>
          <div ref={proficientRef} className="py-8 grid grid-row-2 h-screen">
            <div className="flex w-full flex-col mx-auto px-16 max-w-7xl h-full">
              <div className="text-black text-3xl bg-white ">
                What languages are you proficient with?
              </div>
              <div className="w-full overflow-hidden">
                <div className="gap-20 flex max-md:flex-col h-full">
                  <div className="flex flex-col overflow-y-hidden h-full items-stretch w-[42%] ">
                    <div className="flex flex-col gap-4 mt-12 ">
                      <FormField
                        control={form.control}
                        name="languagesProficient"
                        render={() => (
                          <FormItem>
                            <div className="h-[30rem] overflow-y-scroll space-y-2">
                              {languages.map((item) => (
                                <FormField
                                  key={item + "Proficient"}
                                  control={form.control}
                                  name="languagesProficient"
                                  render={({ field }) => {
                                    return (
                                      <FormItem key={item} className="flex">
                                        <FormControl>
                                          <Checkbox
                                            hidden
                                            className="peer"
                                            checked={field.value?.includes(
                                              item
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    item,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== item
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel
                                          data-checked={field.value?.includes(
                                            item
                                          )}
                                          className="flex-1 cursor-pointer text-black text-center text-xl bg-fuchsia-100 self-stretch items-center py-5 px-16 rounded-3xl max-md:max-w-full max-md:px-5 data-[checked=true]:bg-fuchsia-300"
                                        >
                                          {item}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-[58%] ml-5 max-md:w-full max-md:ml-0">
                    <img
                      loading="lazy"
                      src="/proficient.png"
                      className="aspect-[1.04] object-contain object-center w-full overflow-hidden grow max-md:max-w-full max-md:mt-10"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="self-center flex w-full max-w-[1368px] items-center justify-end gap-5 mt-8 px-14 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
              <button
                onClick={() =>
                  learnRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                type="button"
                className="flex-col text-black text-1xl relative  overflow-hidden rounded-full self-stretch justify-center items-stretch pl-8 pr-8 py-3 max-md:px-5  hover:underline"
              >
                Back
              </button>
              <button className="flex-col text-black text-1xl relative bg-fuchsia-200 overflow-hidden rounded-full self-stretch justify-center items-stretch pl-8 pr-8 py-3 max-md:px-5 hover:bg-fuchsia-300 hover:underline">
                Finish
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
