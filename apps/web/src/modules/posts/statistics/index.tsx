import { Plus } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PAGE_ROUTES } from "@/constants/routes"

export interface PostsStatisticsProps {}

const PostsStatistics = (props: PostsStatisticsProps) => (
  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
    <Card className="sm:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle>Your Posts</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Discover insightful perspectives in our latest article. Dive deep into compelling topics
          with us
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link to="/admin/posts/create">
          <Button size="sm">
            <Plus className="mr-1 h-4 w-4" />
            Create New Post
          </Button>
        </Link>
      </CardFooter>
    </Card>
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Total visits</CardDescription>
        <CardTitle className="text-3xl">85.558 visits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">+25% from last week</div>
      </CardContent>
      <CardFooter>
        <Progress value={69} aria-label="25% increase" />
      </CardFooter>
    </Card>
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>This month</CardDescription>
        <CardTitle className="text-3xl">3.558</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">+10% from last month</div>
      </CardContent>
      <CardFooter>
        <Progress value={12} aria-label="12% increase" />
      </CardFooter>
    </Card>
  </div>
)

export default PostsStatistics
