"use client"

import * as React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { useNavigate } from "@tanstack/react-router"
import { Loader2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { add } from "date-fns/add"
import { toDate } from "date-fns/toDate"
import { Button } from "@/components/ui/button"
import Form, { FormField } from "@/components/ui/form"
import { Stack } from "@/components/ui/stack"
import { useManageAuthToken } from "@/components/ui/use-manage-tokens"
import { getQueryClient } from "@/libs/query"
import { cn } from "@/libs/utils/tailwind"
import { useMe } from "@/services/auth/hooks/use-me"
import { useSignIn } from "@/services/auth/hooks/use-sign-in"
import { Nullable } from "@/types/utilities"

export const loginFormSchema = z.object({
  identifier: z.string().email().min(1),
  password: z.string().min(6),
})

export interface LoginFormState extends z.infer<typeof loginFormSchema> {}

export interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  redirectOnSuccess?: Nullable<string>
}

export function LoginForm({ className, redirectOnSuccess, ...props }: LoginFormProps) {
  const { setToken } = useManageAuthToken()
  const navigate = useNavigate()

  const methods = useForm<LoginFormState>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const { mutate: signIn, isPending } = useSignIn({
    async onSuccess(data) {
      setToken(data.data.token, add(toDate(data.data.expiredAt), { months: 1 }).toISOString())

      await getQueryClient.invalidateQueries({
        queryKey: useMe.getKey(),
      })

      setTimeout(() => {
        navigate({
          to: redirectOnSuccess || "/admin",
          replace: true,
        })
      })
    },
    onError(error) {
      Object.entries(error.response?.data.data ?? {}).forEach(([key, value]) => {
        methods.setError(key as keyof LoginFormState, { message: value as keyof LoginFormState })
      })
    },
  })

  const onSubmit = methods.handleSubmit((values) => {
    signIn({
      identifier: values.identifier,
      password: values.password,
    })
  })

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid gap-2">
          <Stack direction="column">
            <FormField
              variant="TEXT"
              name="identifier"
              label="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              placeholder="name@example"
            />
            <FormField
              variant="TEXT"
              type="password"
              name="password"
              label="Password"
              placeholder="*******"
            />
          </Stack>
          <Button disabled={isPending}>
            {isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </div>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isPending}>
        {isPending ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GitHubLogoIcon className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  )
}
