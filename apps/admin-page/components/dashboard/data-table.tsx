"use client"

import { useState, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  lastActive: string
  avatar: string
}

const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "active", lastActive: "2 min ago", avatar: "JD" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "active", lastActive: "5 min ago", avatar: "JS" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "inactive", lastActive: "2 days ago", avatar: "BJ" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "pending", lastActive: "1 hour ago", avatar: "AB" },
  { id: "5", name: "Charlie Wilson", email: "charlie@example.com", role: "Admin", status: "active", lastActive: "Just now", avatar: "CW" },
  { id: "6", name: "Diana Lee", email: "diana@example.com", role: "Viewer", status: "active", lastActive: "30 min ago", avatar: "DL" },
  { id: "7", name: "Edward Kim", email: "edward@example.com", role: "Editor", status: "inactive", lastActive: "1 week ago", avatar: "EK" },
  { id: "8", name: "Fiona Garcia", email: "fiona@example.com", role: "Viewer", status: "active", lastActive: "15 min ago", avatar: "FG" },
  { id: "9", name: "George Martinez", email: "george@example.com", role: "Admin", status: "active", lastActive: "1 hour ago", avatar: "GM" },
  { id: "10", name: "Hannah Davis", email: "hannah@example.com", role: "Editor", status: "pending", lastActive: "3 hours ago", avatar: "HD" },
  { id: "11", name: "Ivan Rodriguez", email: "ivan@example.com", role: "Viewer", status: "active", lastActive: "10 min ago", avatar: "IR" },
  { id: "12", name: "Julia Anderson", email: "julia@example.com", role: "Admin", status: "inactive", lastActive: "5 days ago", avatar: "JA" },
]

type SortKey = "name" | "email" | "role" | "status" | "lastActive"
type SortOrder = "asc" | "desc"

const statusStyles = {
  active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  inactive: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
}

export function DataTable() {
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users]

    // Filter
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.role.toLowerCase().includes(searchLower)
      )
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0
      const aValue = a[sortKey]
      const bValue = b[sortKey]

      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue)
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    return result
  }, [search, sortKey, sortOrder])

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage)
  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }

  const SortableHeader = ({ column, label }: { column: SortKey; label: string }) => (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onClick={() => handleSort(column)}
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage your team members and their roles</CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <SortableHeader column="name" label="User" />
                </TableHead>
                <TableHead>
                  <SortableHeader column="role" label="Role" />
                </TableHead>
                <TableHead>
                  <SortableHeader column="status" label="Status" />
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <SortableHeader column="lastActive" label="Last Active" />
                </TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
                          <AvatarFallback>{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-sm text-muted-foreground">{user.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("capitalize", statusStyles[user.status])}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {user.lastActive}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-2 pt-4">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedUsers.length)} of{" "}
            {filteredAndSortedUsers.length} results
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only">First page</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <span className="px-3 text-sm text-muted-foreground">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">Last page</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
