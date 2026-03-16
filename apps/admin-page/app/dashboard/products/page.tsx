"use client"

import { useState, useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Plus, MoreHorizontal, Package, DollarSign, ShoppingCart, Archive } from "lucide-react"

const products = [
  { id: 1, name: "Premium Headphones", sku: "PRD-001", category: "Electronics", price: 299.99, stock: 145, status: "active" },
  { id: 2, name: "Wireless Mouse", sku: "PRD-002", category: "Electronics", price: 49.99, stock: 320, status: "active" },
  { id: 3, name: "Mechanical Keyboard", sku: "PRD-003", category: "Electronics", price: 159.99, stock: 78, status: "active" },
  { id: 4, name: "USB-C Hub", sku: "PRD-004", category: "Accessories", price: 79.99, stock: 0, status: "out_of_stock" },
  { id: 5, name: "Monitor Stand", sku: "PRD-005", category: "Furniture", price: 89.99, stock: 42, status: "active" },
  { id: 6, name: "Webcam HD", sku: "PRD-006", category: "Electronics", price: 129.99, stock: 15, status: "low_stock" },
  { id: 7, name: "Desk Lamp", sku: "PRD-007", category: "Furniture", price: 59.99, stock: 200, status: "active" },
  { id: 8, name: "Cable Organizer", sku: "PRD-008", category: "Accessories", price: 19.99, stock: 0, status: "discontinued" },
  { id: 9, name: "Laptop Stand", sku: "PRD-009", category: "Accessories", price: 69.99, stock: 88, status: "active" },
  { id: 10, name: "Ergonomic Chair", sku: "PRD-010", category: "Furniture", price: 449.99, stock: 23, status: "active" },
]

const productMetrics = [
  { title: "Total Products", value: "248", icon: Package, change: "+12 this month" },
  { title: "Total Revenue", value: "$124.5K", icon: DollarSign, change: "+18.2% vs last month" },
  { title: "Orders", value: "1,429", icon: ShoppingCart, change: "+8.5% vs last month" },
  { title: "Out of Stock", value: "12", icon: Archive, change: "4 critical items" },
]

export default function ProductsPage() {
  const [search, setSearch] = useState("")

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Active</Badge>
      case "low_stock":
        return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">Low Stock</Badge>
      case "out_of_stock":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Out of Stock</Badge>
      case "discontinued":
        return <Badge className="bg-muted text-muted-foreground hover:bg-muted">Discontinued</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground">Manage your product inventory and catalog</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {productMetrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>View and manage all products</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
