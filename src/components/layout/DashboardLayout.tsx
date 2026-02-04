import { Outlet, useLocation } from 'react-router-dom';
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Fragment } from 'react';
import { QuizResumeDialog } from '../QuizResumeDialog';

export default function DashboardLayout() {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  const isPageActiveQuiz = location.pathname.includes('/active');

  return (
    <SidebarProvider>
      <AppSidebar />
      {!isPageActiveQuiz && <QuizResumeDialog />}

      <SidebarInset>
        <div className="flex items-center gap-2 px-4 mt-2">
          <SidebarTrigger className="-ml-1 text-slate-400 hover:text-white" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-slate-700" />

          <Breadcrumb>
            <BreadcrumbList>
              {pathnames.map((value, index) => {
                const isLast = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                const title = value.charAt(0).toUpperCase() + value.slice(1);

                return (
                  <Fragment key={to}>
                    <BreadcrumbItem className="hidden md:block">
                      {isLast ? (
                        <BreadcrumbPage className="font-semibold text-slate-500 dark:text-slate-100">
                          {title}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={to}
                          className="text-slate-500 dark:text-slate-100 transition-colors"
                        >
                          {title}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && (
                      <BreadcrumbSeparator className="hidden md:block text-slate-600" />
                    )}
                  </Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <main className="flex-1 flex flex-col gap-4 p-4 pt-0">
          <div className="flex-1 rounded-xl md:min-h-min mt-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
