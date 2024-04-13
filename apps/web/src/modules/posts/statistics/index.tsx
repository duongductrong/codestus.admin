import { Link } from "@tanstack/react-router"
import { Plus } from "lucide-react"
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
import { formatNumber } from "@/libs/utils/number"
import {
  useSuspensePostStatistics
} from "@/services/post/hooks/use-get-post-statistics"

export interface PostsStatisticsProps {}

const PostsStatistics = (props: PostsStatisticsProps) => {
  const { data } = useSuspensePostStatistics({})
  const statistics = data?.data

  return (
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
          <CardTitle className="text-3xl">
            {formatNumber(statistics?.totalPageViews || 0)} visits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">All visits, all time</div>
        </CardContent>
        <CardFooter>
          <Progress value={100} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>This month</CardDescription>
          <CardTitle className="text-3xl">0</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">+0% from last month</div>
        </CardContent>
        <CardFooter>
          <Progress value={12} aria-label="12% increase" />
        </CardFooter>
      </Card>
    </div>
  )
}

export default PostsStatistics
