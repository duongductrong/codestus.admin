import { CheckIcon } from "@radix-ui/react-icons"

import { IconButton } from "@/components/icon-button"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Icons from "@/components/ui/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/utils/tailwind"

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

type CardProps = React.ComponentProps<typeof Card>

export default function CardDemo({ className, ...props }: CardProps) {
  return (
    <div className="flex flex-row flex-wrap gap-4">
      <Card className={cn("w-[380px]", className)} {...props}>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border border-card-border p-4">
            <Icons name="outline.it-network.message-programming" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Send notifications to device.</p>
            </div>
          </div>
          <div>
            {notifications.map((notification, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </CardFooter>
      </Card>
      <Card className={cn("w-[380px]", className)} {...props}>
        <CardHeader>
          <CardTitle>Muted</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 text-sm text-muted">
          <h2>Home</h2>
          {">"}
          <h2>Navigation</h2>
          {">"}
          <h2>Dashboard</h2>
        </CardContent>
      </Card>
      <Card className={cn("w-[380px]", className)} {...props}>
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 text-sm text-muted">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Button</CardTitle>
          <CardDescription>The general buttons.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 p-6">
          <Button
            variant="contained"
            color="destructive"
            startIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-19" />}
            endIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-20" />}
          >
            Contained destructive
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-19" />}
            endIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-20" />}
          >
            Contained secondary
          </Button>
          <Button
            variant="contained"
            startIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-19" />}
            endIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-20" />}
          >
            Contained default
          </Button>
          <Button
            variant="outlined"
            color="destructive"
            startIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-19" />}
            endIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-20" />}
          >
            Outlined destructive
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-19" />}
            endIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-20" />}
          >
            Outlined secondary
          </Button>
          <Button
            variant="outlined"
            startIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-19" />}
            endIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-20" />}
          >
            Outlined default
          </Button>
          <Button
            variant="text"
            color="destructive"
            startIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-19" />}
            endIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-20" />}
          >
            text destructive
          </Button>
          <Button
            variant="text"
            color="secondary"
            startIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-19" />}
            endIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-20" />}
          >
            text secondary
          </Button>
          <Button
            variant="text"
            startIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-19" />}
            endIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-20" />}
          >
            text default
          </Button>
          <Button
            variant="soft"
            color="destructive"
            startIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-19" />}
            endIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-20" />}
          >
            text destructive
          </Button>
          <Button
            variant="soft"
            color="secondary"
            startIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-19" />}
            endIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-20" />}
          >
            text secondary
          </Button>
          <Button
            variant="soft"
            startIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-19" />}
            endIcon={<Icons className="h-4 w-4" name="duotone.abstract.abstract-20" />}
          >
            text default
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-wrap gap-4 p-6">
          <IconButton hoverable={false}>
            <Icons name="duotone.abstract.abstract-23" />
          </IconButton>
          <IconButton hoverable>
            <Icons name="duotone.abstract.abstract-23" />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  )
}
