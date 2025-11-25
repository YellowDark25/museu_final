import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'

interface AuthorCreditProps {
  author: string
  date?: string
  description?: string
}

export function AuthorCredit({ author, date, description }: AuthorCreditProps) {
  return (
    <Card className="mt-10">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-gray-700">
            <span className="font-medium">{author}</span>
            {description ? <span className="ml-2 text-gray-600">• {description}</span> : null}
          </div>
          {date ? (
            <Badge variant="outline" className="flex items-center gap-2 text-xs">
              <Calendar className="h-3 w-3" />
              {date}
            </Badge>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}