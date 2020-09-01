using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_HRMS.timed
{
    public class timed
    {

        /*
         
         
         
          migrationBuilder.DropTable(
                name: "Attendance");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Salaries");

            migrationBuilder.DropTable(
                name: "Salary_Logs");

            migrationBuilder.DropTable(
                name: "Absences");

            migrationBuilder.DropTable(
                name: "Sectors");

            migrationBuilder.DropTable(
                name: "HRUsers");

            migrationBuilder.DropTable(
                name: "Departments");








        modelBuilder.Entity("API_HRMS.Models.Salary", b =>
                {
                    b.Property<int>("salaryID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("amount")
                        .HasColumnType("int");

                    b.Property<int>("bonus")
                        .HasColumnType("int");

                    b.Property<int>("employeeID")
                        .HasColumnType("int");

                    b.HasKey("salaryID");

                    b.ToTable("Salaries");
                });

            modelBuilder.Entity("API_HRMS.Models.Salary_Log", b =>
                {
                    b.Property<int>("logID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("salaryID")
                        .HasColumnType("int");

                    b.Property<int>("value")
                        .HasColumnType("int");

                    b.HasKey("logID");

                    b.ToTable("Salary_Logs");
                });
            modelBuilder.Entity("API_HRMS.Models.Absence", b =>
            {
                b.Property<int>("Absence")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int")
                    .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                b.Property<int>("employeeID")
                    .HasColumnType("int");

                b.Property<string>("absenceDescription")
                    .HasColumnType("string");
                
                b.Property<DateTime>("absenceDate")
                    .HasColumnType("datetime2");
                
                b.Property<string>("excuse")
                    .HasColumnType("string");

                b.HasKey("absenceID");

                b.ToTable("Absences");
            });

            modelBuilder.Entity("API_HRMS.Models.Sector", b =>
            {
                b.Property<int>("_ID")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int")
                    .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                b.Property<string>("_name")
                    .HasColumnType("string");

                b.Property<int>("_departmentID")
                    .HasColumnType("int");
                
                b.Property<string>("_description")
                    .HasColumnType("string");

                b.HasKey("_ID");

                b.ToTable("Sectors");
            });
            modelBuilder.Entity("API_HRMS.Models.Department", b =>
            {
                b.Property<int>("_ID")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int")
                    .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                b.Property<string>("_name")
                    .HasColumnType("string");

                b.Property<string>("_description")
                    .HasColumnType("string");
                
                b.Property<int>("managerID")
                    .HasColumnType("int");

                b.HasKey("_ID");

                b.ToTable("Departments");
            });
            modelBuilder.Entity("API_HRMS.Models.HRUser", b =>
            {
                b.Property<int>("_HRID")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int")
                    .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                b.Property<string>("_userName")
                    .HasColumnType("string");

                b.Property<string>("_password")
                    .HasColumnType("string");
                
                b.Property<string>("_email")
                    .HasColumnType("string");
                
                b.Property<string>("_image")
                    .HasColumnType("string");

                b.HasKey("_HRID");

                b.ToTable("HRUsers");
            });
         
         
         
         
         
         
         
         
         
         
         
         */
    }
}
