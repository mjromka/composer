"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings, CheckCircle, AlertCircle } from "lucide-react"

interface IntegrationsSectionProps {
  templateId: string
}

const crmSystems = [
  {
    id: "salesforce",
    name: "Salesforce",
    status: "connected",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    status: "connected",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    status: "disconnected",
    logo: "/placeholder.svg?height=40&width=40",
  },
]

const templateFields = [
  "user.firstName",
  "user.lastName",
  "user.email",
  "user.company",
  "user.phone",
  "company.name",
  "company.address",
]

export function IntegrationsSection({}: IntegrationsSectionProps) {
  const [mappings, setMappings] = useState({
    salesforce: {
      "user.firstName": "Contact.FirstName",
      "user.lastName": "Contact.LastName",
      "user.email": "Contact.Email",
      "company.name": "Account.Name",
    },
    hubspot: {
      "user.firstName": "firstname",
      "user.lastName": "lastname",
      "user.email": "email",
      "company.name": "company",
    },
    pipedrive: {},
  })

  const [activeIntegration, setActiveIntegration] = useState("salesforce")

  return (
    <div className="space-y-6 p-8 h-full overflow-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">CRM Integrations</h1>
        <p className="text-gray-600">Map template fields to your CRM system fields</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {crmSystems.map((crm) => (
          <Card
            key={crm.id}
            className={`cursor-pointer transition-all ${activeIntegration === crm.id ? "ring-2 ring-blue-500" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={crm.logo || "/placeholder.svg"} alt={crm.name} className="w-8 h-8" />
                  <CardTitle className="text-lg">{crm.name}</CardTitle>
                </div>
                {crm.status === "connected" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant={crm.status === "connected" ? "default" : "secondary"}>{crm.status}</Badge>
                <Button variant="outline" size="sm" onClick={() => setActiveIntegration(crm.id)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Field Mapping - {crmSystems.find((c) => c.id === activeIntegration)?.name}</CardTitle>
          <CardDescription>
            Map your template fields to {crmSystems.find((c) => c.id === activeIntegration)?.name} fields
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Switch id="auto-sync" />
              <Label htmlFor="auto-sync">Enable automatic field synchronization</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Template Fields</h4>
                <div className="space-y-2">
                  {templateFields.map((field) => (
                    <div key={field} className="p-2 bg-gray-50 rounded border">
                      {field}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {crmSystems.find((c) => c.id === activeIntegration)?.name} Fields
                </h4>
                <div className="space-y-2">
                  {templateFields.map((field) => (
                    <Select
                      key={field}
                      value={mappings[activeIntegration as keyof typeof mappings]?.[field] || ""}
                      onValueChange={(value) => {
                        setMappings((prev) => ({
                          ...prev,
                          [activeIntegration]: {
                            ...prev[activeIntegration as keyof typeof prev],
                            [field]: value,
                          },
                        }))
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select field..." />
                      </SelectTrigger>
                      <SelectContent>
                        {activeIntegration === "salesforce" && (
                          <>
                            <SelectItem value="Contact.FirstName">Contact.FirstName</SelectItem>
                            <SelectItem value="Contact.LastName">Contact.LastName</SelectItem>
                            <SelectItem value="Contact.Email">Contact.Email</SelectItem>
                            <SelectItem value="Account.Name">Account.Name</SelectItem>
                            <SelectItem value="Contact.Phone">Contact.Phone</SelectItem>
                          </>
                        )}
                        {activeIntegration === "hubspot" && (
                          <>
                            <SelectItem value="firstname">firstname</SelectItem>
                            <SelectItem value="lastname">lastname</SelectItem>
                            <SelectItem value="email">email</SelectItem>
                            <SelectItem value="company">company</SelectItem>
                            <SelectItem value="phone">phone</SelectItem>
                          </>
                        )}
                        {activeIntegration === "pipedrive" && (
                          <>
                            <SelectItem value="name">name</SelectItem>
                            <SelectItem value="email">email</SelectItem>
                            <SelectItem value="org_name">org_name</SelectItem>
                            <SelectItem value="phone">phone</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline">Test Connection</Button>
              <Button>Save Mappings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
