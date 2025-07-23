
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ShieldAlert,
  History,
  CheckCircle2,
  ArchiveRestore,
} from 'lucide-react';
import { incidents, type Incident } from './incidents';
import { RecoveryWizard } from './recovery-wizard';
import { useToast } from '@/hooks/use-toast';
import { AppLayout } from '@/components/layout/app-layout';

export default function IncidentResponsePage() {
  const [allIncidents, setAllIncidents] = useState<Incident[]>(incidents);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const { toast } = useToast();

  const handleStartRecovery = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsWizardOpen(true);
  };

  const handleSaveAndClose = (updatedIncident: Incident) => {
    setAllIncidents(allIncidents.map(inc => inc.id === updatedIncident.id ? updatedIncident : inc));
    setIsWizardOpen(false);
    setSelectedIncident(null);
    toast({
      title: 'Incident Updated',
      description: `The status for incident ${updatedIncident.id} has been updated.`,
    });
  };

  const getStatusBadgeVariant = (status: Incident['status']) => {
    switch (status) {
      case 'Reported':
        return 'destructive';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Restoration Pending':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'secondary';
    }
  };

  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reported Incidents
              </CardTitle>
              <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {allIncidents.filter((i) => i.status === 'Reported').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Requiring immediate attention
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  allIncidents.filter((i) => i.status === 'Under Review')
                    .length
                }
              </div>
              <p className="text-xs text-muted-foreground">Cases in progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Resolved This Month
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {allIncidents.filter((i) => i.status === 'Resolved').length}
              </div>
              <p className="text-xs text-muted-foreground">
                +2 since last week
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Incident Queue</CardTitle>
            <CardDescription>
              Manage reported incidents and begin the asset recovery process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Reported Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-mono">{incident.id}</TableCell>
                    <TableCell>{incident.type}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {incident.affectedAddress.address}
                    </TableCell>
                    <TableCell>{incident.affectedUser.name}</TableCell>
                    <TableCell>{incident.reportedDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(incident.status)}
                        className={getStatusBadgeVariant(incident.status)}
                      >
                        {incident.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartRecovery(incident)}
                        disabled={
                          incident.status === 'Resolved' ||
                          incident.status === 'Closed'
                        }
                      >
                        <ArchiveRestore className="mr-2 h-4 w-4" />
                        {incident.status === 'Reported'
                          ? 'Start Recovery'
                          : 'Continue Recovery'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      {selectedIncident && (
        <RecoveryWizard
          isOpen={isWizardOpen}
          setIsOpen={setIsWizardOpen}
          incident={selectedIncident}
          onSave={handleSaveAndClose}
        />
      )}
    </AppLayout>
  );
}
