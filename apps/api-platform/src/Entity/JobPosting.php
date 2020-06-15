<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * A listing that describes a job opening in a certain organization.
 *
 * @see http://schema.org/JobPosting Documentation on Schema.org
 *
 * @ORM\Entity
 * @ApiResource(iri="http://schema.org/JobPosting")
 */
class JobPosting
{
    /**
     * @var string|null
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     * @Assert\Uuid
     */
    private $id;

    /**
     * @var string|null the title of the job
     *
     * @ORM\Column(type="text", nullable=true)
     * @ApiProperty(iri="http://schema.org/title")
     */
    private $title;

    /**
     * @var string|null URL of the item
     *
     * @ORM\Column(type="text", nullable=true)
     * @ApiProperty(iri="http://schema.org/url")
     * @Assert\Url
     */
    private $url;

    /**
     * @var \DateTimeInterface|null publication date for the job posting
     *
     * @ORM\Column(type="date", nullable=true)
     * @ApiProperty(iri="http://schema.org/datePosted")
     * @Assert\Date
     */
    private $datePosted;

    /**
     * @var string|null
     *
     * @ORM\Column(type="text", nullable=true)
     */
    private $employerOverview;

    /**
     * @var string|null Type of employment (e.g. full-time, part-time, contract, temporary, seasonal, internship).
     *
     * @ORM\Column(type="text", nullable=true)
     * @ApiProperty(iri="http://schema.org/employmentType")
     */
    private $employmentType;

    /**
     * @var string|null description of skills and experience needed for the position
     *
     * @ORM\Column(type="text", nullable=true)
     * @ApiProperty(iri="http://schema.org/experienceRequirements")
     */
    private $experienceRequirement;

    /**
     * @var \DateTimeInterface|null
     *
     * @ORM\Column(type="date", nullable=true)
     * @Assert\Date
     */
    private $jobStartDate;

    /**
     * @var string|null skills required to fulfill this role
     *
     * @ORM\Column(type="text", nullable=true)
     * @ApiProperty(iri="http://schema.org/skills")
     */
    private $skill;

    /**
     * @var \DateTimeInterface|null The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours.
     *
     * @ORM\Column(type="datetime", nullable=true)
     * @ApiProperty(iri="http://schema.org/validThrough")
     * @Assert\DateTime
     */
    private $validThrough;

    /**
     * @var Organization|null organization offering the job position
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Organization")
     * @ApiProperty(iri="http://schema.org/hiringOrganization")
     */
    private $hiringOrganization;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setUrl(?string $url): void
    {
        $this->url = $url;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setDatePosted(?\DateTimeInterface $datePosted): void
    {
        $this->datePosted = $datePosted;
    }

    public function getDatePosted(): ?\DateTimeInterface
    {
        return $this->datePosted;
    }

    public function setEmployerOverview(?string $employerOverview): void
    {
        $this->employerOverview = $employerOverview;
    }

    public function getEmployerOverview(): ?string
    {
        return $this->employerOverview;
    }

    public function setEmploymentType(?string $employmentType): void
    {
        $this->employmentType = $employmentType;
    }

    public function getEmploymentType(): ?string
    {
        return $this->employmentType;
    }

    public function setExperienceRequirement(?string $experienceRequirement): void
    {
        $this->experienceRequirement = $experienceRequirement;
    }

    public function getExperienceRequirement(): ?string
    {
        return $this->experienceRequirement;
    }

    public function setJobStartDate(?\DateTimeInterface $jobStartDate): void
    {
        $this->jobStartDate = $jobStartDate;
    }

    public function getJobStartDate(): ?\DateTimeInterface
    {
        return $this->jobStartDate;
    }

    public function setSkill(?string $skill): void
    {
        $this->skill = $skill;
    }

    public function getSkill(): ?string
    {
        return $this->skill;
    }

    public function setValidThrough(?\DateTimeInterface $validThrough): void
    {
        $this->validThrough = $validThrough;
    }

    public function getValidThrough(): ?\DateTimeInterface
    {
        return $this->validThrough;
    }

    public function setHiringOrganization(?Organization $hiringOrganization): void
    {
        $this->hiringOrganization = $hiringOrganization;
    }

    public function getHiringOrganization(): ?Organization
    {
        return $this->hiringOrganization;
    }
}
