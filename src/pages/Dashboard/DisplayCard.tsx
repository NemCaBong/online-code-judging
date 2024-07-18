import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Progress} from "@/components/ui/progress.tsx";

export function DisplayCard({className}: {className?: string}) {
	return (
		<Card className={className} x-chunk="dashboard-05-chunk-1">
			<CardHeader className="pb-2">
				<CardDescription>This Week</CardDescription>
				<CardTitle className="text-4xl">$1,329</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-xs text-muted-foreground">
					+25% from last week
				</div>
			</CardContent>
			<CardFooter>
				<Progress value={25} aria-label="25% increase" />
			</CardFooter>
		</Card>
	)
}