﻿// <auto-generated />
using System;
using API_HRMS.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API_HRMS.Migrations
{
    [DbContext(typeof(EmpContext))]
    [Migration("20200820164029_updated-v0.2.2-migration")]
    partial class updatedv022migration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("API_HRMS.Models.Absence", b =>
                {
                    b.Property<int>("absenceID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("absenceDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("absenceDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("employeeID")
                        .HasColumnType("int");

                    b.Property<bool?>("excuse")
                        .HasColumnType("bit");

                    b.HasKey("absenceID");

                    b.ToTable("Absence");
                });

            modelBuilder.Entity("API_HRMS.Models.Attendance", b =>
                {
                    b.Property<int>("attendanceID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("attendanceDate")
                        .HasColumnType("datetime2");

                    b.Property<TimeSpan>("dailyHours")
                        .HasColumnType("time");

                    b.Property<int>("employeeID")
                        .HasColumnType("int");

                    b.Property<DateTime>("entry")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("leave")
                        .HasColumnType("datetime2");

                    b.HasKey("attendanceID");

                    b.ToTable("Attendance");
                });

            modelBuilder.Entity("API_HRMS.Models.Department", b =>
                {
                    b.Property<int>("_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("_description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("_name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("managerID")
                        .HasColumnType("int");

                    b.HasKey("_ID");

                    b.ToTable("Department");
                });

            modelBuilder.Entity("API_HRMS.Models.Employee", b =>
                {
                    b.Property<int>("_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("HRID")
                        .HasColumnType("int");

                    b.Property<string>("SSN")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("active")
                        .HasColumnType("bit");

                    b.Property<string>("address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("birthDate")
                        .HasColumnType("int");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("nationalID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("nationality")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("rating")
                        .HasColumnType("float");

                    b.Property<int>("sectorID")
                        .HasColumnType("int");

                    b.Property<DateTime>("startDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("telNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("_ID");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("API_HRMS.Models.HRUser", b =>
                {
                    b.Property<int>("_HRID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("_email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("_image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("_password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("_userName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("_HRID");

                    b.ToTable("HRUser");
                });

            modelBuilder.Entity("API_HRMS.Models.Salary", b =>
                {
                    b.Property<int>("_salaryID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double?>("amount")
                        .HasColumnType("float");

                    b.Property<int>("bonus")
                        .HasColumnType("int");

                    b.Property<int>("employeeID")
                        .HasColumnType("int");

                    b.HasKey("_salaryID");

                    b.ToTable("Salaries");
                });

            modelBuilder.Entity("API_HRMS.Models.SalaryLog", b =>
                {
                    b.Property<int>("_logID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("_logDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("_salaryID")
                        .HasColumnType("int");

                    b.Property<double?>("bonus")
                        .HasColumnType("float");

                    b.Property<double>("value")
                        .HasColumnType("float");

                    b.HasKey("_logID");

                    b.ToTable("SalaryLog");
                });

            modelBuilder.Entity("API_HRMS.Models.Sector", b =>
                {
                    b.Property<int>("_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("_departmentID")
                        .HasColumnType("int");

                    b.Property<string>("_description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("_name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("_ID");

                    b.ToTable("Sector");
                });
#pragma warning restore 612, 618
        }
    }
}
